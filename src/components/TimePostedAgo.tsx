"use client";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import norwayStrings from "react-timeago/lib/language-strings/no";

const TimePostedAgo = ({ dateString }: { dateString: string }) => {
  const formatter = buildFormatter(norwayStrings);
  return <TimeAgo date={dateString} formatter={formatter} />;
};

export default TimePostedAgo;
