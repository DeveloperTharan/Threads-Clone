/* "use client";

import React, { memo } from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

const ReactTime = ({ data }: { data: Date }) => {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);
  return (
    <ReactTimeAgo
      date={data}
      locale="en-US"
      timeStyle="twitter"
      className="text-xs text-neutral-500"
    />
  );
};

export default memo(ReactTime); */