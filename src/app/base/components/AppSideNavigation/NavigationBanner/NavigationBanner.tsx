import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom-v5-compat";

import { isSelected } from "../utils";

import urls from "app/base/urls";
import authSelectors from "app/store/auth/selectors";

const NavigationBanner = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const isAdmin = useSelector(authSelectors.isAdmin);
  const location = useLocation();

  const homepageLink = isAdmin
    ? { url: urls.dashboard.index, label: "Homepage" }
    : { url: urls.machines.index, label: "Homepage" };
  return (
    <>
      <Link
        aria-current={
          isSelected(location.pathname, homepageLink) ? "page" : undefined
        }
        aria-label={homepageLink.label}
        className="p-panel__logo"
        to={homepageLink.url}
      >
        <div className="p-navigation__tagged-logo">
          <div className="p-navigation__logo-tag">
            {/* <svg
              className="p-panel__logo-icon p-navigation__logo-icon"
              fill="#fff"
              viewBox="0 0 165.5 174.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="15.57" cy="111.46" rx="13.44" ry="13.3" />
              <path d="M156.94 101.45H31.88a18.91 18.91 0 0 1 .27 19.55c-.09.16-.2.31-.29.46h125.08a6 6 0 0 0 6.06-5.96v-8.06a6 6 0 0 0-6-6Z" />
              <ellipse cx="15.62" cy="63.98" rx="13.44" ry="13.3" />
              <path d="M156.94 53.77H31.79a18.94 18.94 0 0 1 .42 19.75l-.16.24h124.89a6 6 0 0 0 6.06-5.94v-8.06a6 6 0 0 0-6-6Z" />
              <ellipse cx="16.79" cy="16.5" rx="13.44" ry="13.3" />
              <path d="M156.94 6.5H33.1a19.15 19.15 0 0 1 2.21 5.11A18.82 18.82 0 0 1 33.42 26l-.29.46h123.81a6 6 0 0 0 6.06-5.9V12.5a6 6 0 0 0-6-6Z" />
              <ellipse cx="15.57" cy="158.94" rx="13.44" ry="13.3" />
              <path d="M156.94 149H31.88a18.88 18.88 0 0 1 .27 19.5c-.09.16-.19.31-.29.46h125.08A6 6 0 0 0 163 163v-8.06a6 6 0 0 0-6-6Z" />
            </svg> */}
            <img
              alt="kunpeng logo"
              className="my-logo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAADICAYAAADVy2J6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABRmSURBVHgB7Z3ZdRvHEoZrsOg+mo5A4whMRWAwApMRCIyA9LWoc98kvd2jxSIjIByBqAgMRyAqAkERCH4VQbS7umaIbWbQPVO9DNDfORBFgguWf6qru7YEdDkXB9CHY/m/X+TtEASkkMABhMVUPq4rmMElXCZTiFgh2fod5yKFR3AGcxgGKJKcKBaHlIsGLcsjeCHfjHMIGQFj6MEp/D+ZQMQJxaJB69KHv+T/UgiVBCbS+p3C22QMEad0Nr5yIQ6DFwzIpeg7PImC8cOqpQnfwkzhHn6DP5IR7Cr0HqDviJsN/Hgg36XH2b1p5c8myrebqo9z+EdZYyFv+Pmd/Mjk762K5kJ8gXAFcwtdONkZ3wV9xp4UBoojgZ/BxY6UBHWrbnP4CviazuTNUEwL0TwX74N1egX8KZ/ceat3RvmRBQnkWAkkHG4zH/Fv+XEMb5Lbqm8m0ZBJ/AIhIuCV9F1eQhuh44qn8jkM5GcDaAtokTpSPAI+ymVtLC/WyfLdJJoLcS3/HUJoCOm/vE0uoU3QUcVZ64RSzW1m7Udo7XvqSYYomHu5nW6Tw/tMDOQl+AJQKAJ2DfS7DqUPhlz2stBAWLRFMLlVmUt/K9zTcj4S+BWUaCiWFA5tEMxyaEWoLfG+MMALpSef9GEwTzp0wdCGAZegoVqC9kcsC/qQoqVJIQRwlxSqYNoSh3PBPRz2gliLQ91WL/ssYg98Fk164J+bIAVDu6Hr7JQ2soRf0eAp5Hfpx4QE+S3vAQLcVQZCB/yBp45HQYUGLsSZvIw+QRRMJf4sDfoxoQQfKS70AXBL2f6laFJxXwoM+BLNKJjwQO67hJ0/tAxa5rG8UZQab3fya5cGFyAuwT35fOmMKVU3gMeZ/3a47cfdiwb9mI60MiHwXOA2+iWEDebIoDg+ytjPjZE4yqDfMSm9HxPx5lJAHRUS+TkT0sPuMZHf4DpScipD7yPwyfJyFCqY+5zIIOGdEop/vw+FBEo8t65FM5KC8btbakP+M1mBsTpDy8+HkoLHK9RSNc3uL8/a25IfY4o70dCydOTV+UX/BaSF2Yfg4iZ5otVn+T7cKkHVFJM70fjOjcHttFzNIbIgT//EZCsUlWaivhvRoMJfJz+BL9rh8PpnS8Zejpvdk/C4W4qC0Yd8KDzYPJZ+H1rnsfz3z3UB2bc0uAt4mxyBD6JgOBkDCkjufF1YGj9WJgqGm4G6/VdYjz2NvFRBotMbBWMNu6LBDHbXPBe4JsddkkXsiYZ8mTG4BA/u5iqOFLGITZ/GrS+zOOmNGXaWsWNp8FzGtZWhhO8UItaxIxrX5zK4Uwqx4G9H4RdNomIaI3AFLktxp+QUftEIdQjkDvJjIg7hF03X4dJEQcgUIk7hFQ1GTF2lPuCyBLF4zQe8osG2rK6IuyVv8Iqm68ifISszhIgX+ESDDrCrpYmsTMQTfKJJHMWZzK3MjcoajLDBJxpXS1NPs/qREquP5JnRiUqujrDBIxqXu6YEzjS+a7U5dez4wApPwFLA3+ACqiZIS+8vb30fRcMIj6UR0m9wgahcmspb30dL0xyq8lTwWBpXEe2ksD/gbVYeMy79uY5q+BxpAtWKnUpLftNcNMLZ2czBWnE6zXjSaYgUUl/B9pLK2zU8gmlz0STwGVzQWxKMyYync3G4pxWVdpjBAYdoxuAGFM0068+nnwPc25mu4cHAsTxNwAUdVQv+xHhrr7dFjxjQXDTMHQlKeZ2Y79AuxBBiUJOdZlvuBNwIpj4xRmWBZqIRqoVXmFDecAoRdpoe7k0gRGJJrlWaWpoJhEYUjHWaOcKdgERDxXLX2XCuiEWaiWYeQMoBtXR9CjGTzxnNROMjT4WGXAyA5lSFNkB0L2hqab6BK/JZS0IJJYYFPBLCFJbtPBdPpUAxdLBPU9yCJXzRYL8ZAaMolnDwOYVFD6HG6EQCImzRxNhRkIRuaZ5CJDjCFQ0NmR9AJDiaRrntdSHvbZ87FPFD0zCCzfOSXRDNYkrKJim0lGaimVkUTXHlQUhMVcBWqOkmXx9G5cxUPG6qPaOJDi3zET2HakSPUNUT64n0wdDU0qRgj7BOfUkcWBR4WzVswpjV3zNeuQ/9OlqmB4Bhk7UJb75oGnt6DLbwX3YyARwBiIWAMykUH9Pd6G+OYVlMFKA9lrdffcXdmorGnvn0UXZCNVx8syJtQEWBeDvPRgQOXQuo6RQWHHX3I3BDMyZdBUNpSNZMxrZCmhFuCtW5D7M0EXvcw2nz0T04VfVdwpsr/D/pHN7DF7AHiuNPtfT4GPhhE3ztZvBSWR8b/o8UDUfdE85yGkE7oFLetluVKqgubJiJZyg3K0+5l67moum24DwlH1fse7SzS0g8L6V4RpnlYVu2mocRbJyncDVIEmoe45GabLdPglkGX8u3yVBe3D9xjVJqLhrcGlOciBfRIJU0UdvlUyWWXfNZ6pKLB1+XpFlBAE/A8pGVwOIE6nGlJvPuq2XZBr4uOB+9gdXh6oQ1AH7MW5hgR4k3yTn4Bi2vDevLRUOrw5UaYeNswLROXK/BkQv6crfSk0cGz8Q3eaTxFzwX71XaamhCyq2OoXC4RHOQHS7xMTPoe4NPuhvQ3ErspJHAb9mp9kBawHN5+6AOLFFEmJFI/ZD9g1YHl/O5/ogCzubTx8DJZXKr7QzjsuSqJa0ueBUXvxEDwDZkfWmJcgGFwLvkXHe4G2fmHv8SpeOsuR5KZsI75V+NK75jACigC/ElCPHQ8n667ds4RcO/RCUarWaFp2HxunS1nM0UQhEPXYBPqqw897wn3iZCeMZStUSFbGVycNmcb796M1IIQTzkkx2VvfbcieWDLFzPyVXN+8IBxT83eqwpoHieiw/eHOYK4dioRhgCJxhcLLM2HUed0jkg/8bsGAHr1tFhpq5e7ikRjg3RPGU9j6BodNFVOgpux7SNLpzUCo9gkyZcsnxYHWrEebL8pU6jGE8xmNfKeypbZG26gTvARZDI6z5uTED/5MXXId/yYWYWikbXSdMHe/fatDYup9hxQ42zTU+7c/A1vfayXOHjznaqHbnW3hg6aTrYsTb51rVhlNY7TSfd0XL1yflyhec4cxiTT3OvGhvWVX8xNqzN3IJV9IH5bqqIQzXI3rVwLpNJJ/vPtLaTVg4mh/O2Cclf7JD7F+uCF2rz1ztVwuE/5qhksXsiH+EEeBmynxLfq9TFCbQdvFATloGsqbz9xf46V7BZjvZMnMuvclqIsdy2HUGkGAxacnXHSORF+jqxPrV485xmyUtmYiC9ff+JUaHC+VpjmznsT2iZ8sLX38WllBTX2Jsp3MkgWKhVi77htDYIJdOPwRLlJ8KUX8Fl6g5UN/FIMdyR+gQ+2HSOq8MImEfKJ5y4TJWxqM/mAo86rAU7t8eeOIUj4EUwaY6hwZ8XlGbnOOx5yXoBSxIOx5PCZeoDRDbhtzZIauP11o9y4xEyj3AOVXZ+ZBM7WYgD7tfbvG0Q1zmOozOF1oFlLzZ68+BB4muDKcMVmOfTUJT2SeNTWSEDkI6Pv1uCnWxERn+yXhIWJuZ0VIuRJkFOqx5+a5lZq9864HKM62fuYazqTfKk4TqcRsd4jUWfPRuk8Kh58n/zdE9ykI8aLFeHcpmKB3/L2CzLwWrPhsHNDksWGG4Xv0s/p36OyNBb8nSIzEC/urQOiTydb7BMdVQWGMcbhmaVMu7rOclcj2MXoCXqI9ij0TJFyxPnG4ZOMhaUC1UAPzH50exx7Eeo4XdxXLlMJNb8GkI8tJQ1prP0S15mxVk8ZwS4Na/TPAeHgjkI73sHGyhW9cG7c1LTVeu8bdURpuIsvoTluv3eHOWFeINe3+PsVozdXVTOQPXNMaRo98RfX7MqHr1la5eF03/InalumiDULAa7oGU3XF3Kttx26mtIPJfK58GWFmLLlbS7wll+Xav8ijHYJzUtN6o+p7FZDordHrD7ZheqBUTC2Z1dFVmW9OHzpCJjz/bWe/EYjMqNdA73UqtF6HSyTAK6gx/lWc+J8n/EUohil7bjyUYK7c+l30t+zQTsY1TcaDobYZJFS1149svzjg7V4CzsOt7mvsA0EGxz5gNeLGVt93lztavAPO6fdNr/m7a5T1XDwQsxkn/glfVE8aJ5R22mX3Kg1oUfAErbqTQJCpuAF+hQftwaMK0bexpmjQavY5RaE3qdhoX3deUpehl3zkQD2eSWrTQNWEbx6NKvOLavngU6AXcMdIKZXE2NoniqqLIySNXUYVyiXeygFo/lbPu38DJc6Y8bcqt3l/S3Bge3vU4TcAWOLNjyvtlon4YMgBosf1PWp8ZR9c6wzcro4LbhQe4Ql2JLNMsMsx2XUAFRtEAh5wZzL699hja5Av4Bl2xxiJtPljNBLAXpLgSe+dzKwzyade16jDENV02BBqjjAVsqH8sAKLH7JXDAYWUQ9GnM60aaQEtUyfvhVjSrpGq2Yj5ToQ8oJNxeTjMxfZV2EBs3T6WgJurruqKiNRlFcSB/F/6dg+xvPc7KQw5hea7j4njzFeskF10rM9+y/CQOHeGcijMbn6IpgpYtdMYSoDcTP/azey+yd7dsjZ8rkaw6cbkgkrXP1xHMgqEsgSG0FYqJtUI0epRNf61rwjFd4y1PIdkS+r5MZ6ulqb7fDqWzSV04wiGDS+EJu2AouJpqf7+P5Wc7pbk++ysaGiz2hD34is6vMHSk74LtIVi4y91X0VypkhsbDayxitGM7Q4+8zB2bUpyfdrp09QHl6NTa6kduCyZvsHCYUDSnMJcn32yNFcqX8SWYOosS0ji+ODOjLQopLD7lobSSF9ZTd6i5CrTZYkQWrlCKfiCkuDGq1/aVdDRpbOXEdiGDvFSqMf25SlRSVq+2APR5GJ57WhMIfkxQ6jLTMun8ZctkGxeDLsjmnwZeuMwhxij93X8mJxEM94mVHzMF+n6F9ouGnzBsXLhxnnCOfoxc7hu9GbqFsMlHi1NwQ6qjaKZZtvUV84j4zkLx7fZm6lT5H/uPY2kYPeExWr38hBHqIL0AYQJznq6USUsvoSSQykVKJgUmvJdQzRdjzsnYkM0q8Y1rzPCdAWqMxqAHzAlYiz//mcpkptgZiosBNP86kcf7K3GdJpn4iX7vHNT5lK475KHGVury1NRnRFl2S0K1kClH3CZzIlKMMLlBgUi5Of38m/7tCRlcAoGSTS7aCTl0WZfbPdpaMTu5rYQ1/VeZjrzbVn5EfpURXLn2UfTpCrfcAsG6WoWAPrdORGJqrcvsTQm0JIxgV3HhmB0p/2iE+x351TIvufTVEO7pE/AKRhEd2nqM/9dJqJoykBfjmuXtI7u0gR6ZbKuiaIpAhspCUuCARgZ5PFES9MKcGIJNlKy5Uvo9h6kQ70UAmTfkrDKIf/lg9qt2AKDqbqxsW64lQzR0iAX4kxePvwO7zom7etDOp9ZS3zfb0tD1uUaIKuzsglamY6mA4yPKwnIn5nDt+VP99fSYB4MWZcBuED3bAbpmnXbtM5SCAHZP0uDtTw4UILKdN3RNViaOkFttTdO7fdHNCQWDPwNwD362+z1lrG+Kaju3H3R+BUL0TVygMNqtj3fF0tDKR7DrM/KAPxypW1luFqTcILZB2vslmjQqqA/MFeC8R/oox3Tpfb39wNMghO7uDzh1fkInqr2JKAyEMGpg1sFnsuYlf6G2JV9Iy2mp2YfYNKVaEk38Dy7kHYYx2oXZNJz3RVoZUzKaKifTQqhMSsSDT3QoRquTk2DxlmW/Nh7Pi6CInmkrMgv6oifkpIOghTKMnM4BTPCszIo/IL3v2h5GmS5wS8eWpolKmf3s2q5jmvcXfEvawQtM4eq1VneAy9vcyZWnkgbGBlZ7VCtjNh0ghEdnya/uo8f3jwU0zMxzfbwi0khAr5W/qYO/KBEQaQbaaLi4cG2F3J+9bfYRIi+TGmdeX1HOG94uPq1bQ+i+vNdwNT5DdXKEIUlwzHKzctIza4yI0wrgytIyRIb82m4qLMshW1lSkuGo6XhQsCJ0bJEp78hT8u7KbsjWhoOqA+OTsuQBc162tinIvk9WprmjIybVocYY1oGW6BUWM0omiYk6szqNzClbqs1V8yrk9+jaOpCju+R8SGnaWNqH/TK/RkkiqYeUyUY0z7EdTuAukQjLTWKph5HtRpXh74sIRolw3H3ZMq9DET+YbhTQuo0pnaNZmQ+WhoTSDAjMAWTw0JflhC9nsZRNNrUFQzVMF1DG9DMZY7L03am6rT3j5oJaljqG/puidCumIiWpgpK/TiqndGIzQQC7fywgUHFRBRNObdqW/2mhtOLkOMbVqVkOSbtT6JoCsF86bua22oEGwq0wfHN6ZpF56NPs8o0Cz7ql52sQ63v6/+8e0amF0cUzYJbecWd1LYuCLZca9r63jVd49TUKBoFx3hlFAy2XAuwG2cp5nVZio5q/ryv0GHWk8aCyXv0tUkwuDOs+bzR0kygLdtCPpr7LjkkmFGrliREmC9LObh7+gz7A4kFZ1nyCOaFEkz7qJMA/0AvGx8TVnsLflAsVzCTuxqOIj+s+vwPvFeNBtpGvbqstV9BtdFfWrUe68MrFiTvAtreJf20iZVBaCX+XVxK9Z3BrkAO7kcplhFr+TCewdCWuq0X2JUUTONTatpy9+WVOFM11G1epuyNJqQmBBQWaJvDm0O5Mixhjc0hYX1Vsz3IukiFfkXZE0pO3tixHZHqYvJ85iYHlyu/rgpqGoi3XyCMUYU0xAxboaADXzeYqANdQCiWY2g7okGkvgAzY0siOlTdHmhcITqDtqzRYuIcHvHfqYlzE7ANLUVn0nc534nNAcdp9xrNV+i8M5XIxhTiCz2HH2B5CPj6QPC8j1s+ba4D/6ivUTv1Wyv9b3Sg2urwS0x0sSAYpK1uHS+7JhaE2uENwQL7K5pdW4ZWuZH+3glYYj/b3OdtY2lJ3TVweTft92fEfliavG0sKKGksKsI1VzzxLY/+C+DI58DK82YogAAAABJRU5ErkJggg=="
              width="24px"
            />
          </div>
          <div className="p-panel__logo-name is-fading-when-collapsed ">
            KUNPENG
          </div>
        </div>
      </Link>
      {children}
    </>
  );
};

export default NavigationBanner;
