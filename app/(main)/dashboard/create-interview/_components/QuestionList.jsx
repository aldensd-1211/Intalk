import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      const Content = result.data.content;
      const FINAL_JSON = Content.replace(/```(?:json)?/g, "").trim();

      try {
        const parsed = JSON.parse(FINAL_JSON);
        setQuestionList(parsed?.interviewQuestions);
      } catch (e) {
        console.error("Failed to parse JSON:", FINAL_JSON);
        toast("Invalid response format from AI");
      }

      setLoading(false);
    } catch (e) {
      console.error(
        "Error generating questions:",
        e.response?.data || e.message
      );
      toast("Server Error, Try Again");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    setSaveLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-white rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI model is crafting personalized questions based on your job
              position
            </p>
          </div>
        </div>
      )}
      {!loading && questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2Icon className="animate-spin" />}
          Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
