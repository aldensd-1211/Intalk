import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };

  const onSend = () => {
    window.location.href =
      "mailto:aldendcunha1211@gmail.com?subject=Intalk Interview Link & body=Interview Link: " +
      url;
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[35px] w-[35px] bg-primary rounded-full"></div>
        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>
      <h2 className="mt-2 font-bold text-md">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration} Min
        <span className="font-semibold">
          {interview["interview-feedback"]?.length}{" "}
          {interview["interview-feedback"]?.length === 1
            ? "Candidate"
            : "Candidates"}
        </span>
      </h2>
      {!viewDetail ? (
        <div className="flex gap-3 w-full mt-5">
          <Button variant="outline" className={"w-[50%]"} onClick={copyLink}>
            <Copy /> Copy Link
          </Button>
          <Button className={"w-[50%]"} onClick={onSend}>
            <Send /> Send
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className="mt-5 w-full " variant="outline">
            View Details
            <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
