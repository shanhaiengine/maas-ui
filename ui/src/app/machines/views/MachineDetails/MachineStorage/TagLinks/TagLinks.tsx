import React from "react";

import { Link } from "react-router-dom";

import type { NormalisedStorageDevice } from "../types";

import { filtersToQueryString } from "app/machines/search";

type Props = { tags: NormalisedStorageDevice["tags"] };

const TagLinks = ({ tags }: Props): JSX.Element => {
  return (
    <>
      {tags.map((tag, i) => {
        const filter = filtersToQueryString({ storage_tags: `=${tag}` });
        return (
          <span key={tag}>
            <Link to={`/machines${filter}`}>{tag}</Link>
            {i !== tags.length - 1 && ", "}
          </span>
        );
      })}
    </>
  );
};

export default TagLinks;