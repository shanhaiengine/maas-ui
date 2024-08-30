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
            <svg
              className="p-panel__logo-icon p-navigation__logo-icon"
              fill="none"
              height="23"
              viewBox="0 0 16 23"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_953_82)">
                <path
                  d="M2.00286 2.41311L4.2355 4.25606e-06H1.63076C1.41686 -0.000484973 1.20496 0.0412077 1.00719 0.122697C0.809418 0.204185 0.629658 0.323871 0.478191 0.474905C0.326725 0.62594 0.206526 0.805358 0.124473 1.00289C0.0424194 1.20043 0.000121739 1.41221 0 1.62611L0 3.90154L2.00286 2.41311Z"
                  fill="#0075FF"
                />
                <path
                  d="M7.86911 14.4461C4.78249 15.1094 2.08379 14.5698 0 12.5446V16.1782C3.21407 17.2415 6.52023 16.0452 7.86911 14.4461Z"
                  fill="#0075FF"
                />
                <path
                  d="M5.00483 13.6526C1.81588 10.8199 0.781423 7.45143 2.64009 3.60292C3.46152 1.90239 4.629 0.719095 6.08207 0H1.6261C1.42193 0.000474872 1.21965 0.0392884 1.0298 0.114423C0.661908 0.47018 0.32948 0.86087 0.0372106 1.28098C0.0125423 1.39436 6.78258e-05 1.51006 0 1.6261L0 10.4329C1.20376 12.1632 3.04941 13.4144 5.00483 13.6526Z"
                  fill="#0075FF"
                />
                <path
                  d="M8.17796 20.4882C10.459 18.5346 11.7065 14.9066 10.8246 12.7279C9.45987 16.5113 6.83931 18.6983 2.7908 18.7486C1.8446 18.7694 0.901517 18.6329 5.30137e-07 18.3448V21.1654C-0.00017157 21.3774 0.0415599 21.5873 0.122796 21.7831C2.85591 22.8101 6.01603 22.345 8.17796 20.4882Z"
                  fill="#0075FF"
                />
                <path
                  d="M15.4276 15.0628C14.755 12.193 12.1205 9.53148 9.71946 9.32404C12.1037 12.1818 12.7893 15.3429 11.0916 18.7095C10.033 20.8063 8.48128 22.1515 6.49609 22.7915H13.1326C14.1561 21.8154 14.9064 20.5885 15.309 19.2327C15.7116 17.8769 15.7525 16.4393 15.4276 15.0628Z"
                  fill="#0075FF"
                />
                <path
                  d="M10.724 0.800043C7.78343 1.45867 5.02333 3.86341 4.83728 6.01325L6.55827 4.89693C6.61315 6.00023 6.1657 6.69792 5.21682 6.90909C4.71355 7.02073 4.53866 7.2812 4.43447 7.72122C4.15539 8.89707 4.36284 9.92315 5.17868 11.0618C5.20659 10.7902 5.17217 10.5706 5.2559 10.4106C5.4959 9.95385 5.67451 9.32872 6.07174 9.11661C9.75001 7.10724 13.6999 7.7761 16.0005 10.672V5.61603C15.887 5.54967 15.7716 5.48455 15.6544 5.42067C15.7698 5.44765 15.8851 5.47928 16.0005 5.5137V3.30618C14.6162 2.74802 13.1166 2.54801 11.4915 2.67453C12.5938 2.15637 14.0962 2.1266 16.0005 2.57499V1.62612C16.0004 1.45717 15.974 1.28927 15.9223 1.12843C14.2785 0.57957 12.4078 0.423285 10.724 0.800043Z"
                  fill="#0075FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_953_82">
                  <rect fill="white" height="22.7915" width="16" />
                </clipPath>
              </defs>
            </svg>
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
