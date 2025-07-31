import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview }) {
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
      <h2 className="mt-2">{interview?.duration} Min</h2>
      <div className="flex gap-3 w-full mt-5">
        <Button variant="outline" className={"w-[50%]"} onClick={copyLink}>
          <Copy /> Copy Link
        </Button>
        <Button className={"w-[50%]"} onClick={onSend}>
          <Send /> Send
        </Button>
      </div>
    </div>
  );
}

export default InterviewCard;
