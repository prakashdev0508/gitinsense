"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import MDeditor from "@uiw/react-md-editor";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { api } from "@/trpc/react";
import { Download, LoaderCircle, SaveIcon } from "lucide-react";
import { pricingData } from "@/utils/constant";
import useRefetch from "@/hooks/use-refetch";

const AskQuestion = ({ projectData }: any) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const refetch = useRefetch();

  const saveQuestion = api.saveQuestion.createSaveQuestion.useMutation();
  const reduceAskQuestionCredit = api.project.reduceCredits.useMutation();

  const handleSubmit = async () => {
    if (question.trim() == "") {
      return;
    }
    if (!projectData) return;
    setLoading(true);
    try {
      const { output } = await askQuestion(
        question,
        projectData.id,
        projectData.githubUrl,
      );

      setOpen(true);

      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setAnswer((prev) => prev + delta);
        }
      }

      reduceAskQuestionCredit.mutate({ credit: pricingData.perQuestionAsk });
      refetch();
      setLoading(false);
    } catch (error) {
      toast.error("Error while ");
    }
  };

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(false);
            setAnswer("");
            setLoading(false);
          }}
        >
          <DialogContent className="max-h-[90vh] bg-white sm:max-w-[70vw]">
            <DialogTitle className="flex">
              <div>GitInsite</div>
              {loading && (
                <div>
                  {" "}
                  <LoaderCircle
                    className={loading ? "ml-2 animate-spin" : "ml-2"}
                    size={17}
                  />{" "}
                </div>
              )}
              {saveQuestion.isPending ? (
                <>
                  <LoaderCircle className="ml-5 animate-spin" size={17} />{" "}
                </>
              ) : (
                <>
                  <div
                    title="Save question answer"
                    className="ml-5 cursor-pointer"
                    onClick={() => {
                      if (!saveQuestion.isPending) {
                        saveQuestion.mutate(
                          {
                            projectId: projectData.id,
                            question: question,
                            answer: answer,
                          },
                          {
                            onSuccess: () => {
                              toast.success("Answer saved ");
                            },
                            onError: () => {
                              toast.error(
                                "Error saving answer please try again",
                              );
                            },
                          },
                        );
                      }
                    }}
                  >
                    <Download size={17} />
                  </div>
                </>
              )}
            </DialogTitle>
            <MDeditor.Markdown
              source={answer}
              className="no-scrollbar !h-full max-h-[60vh] max-w-[90vw] overflow-scroll bg-white"
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      <div className="rounded-md bg-white">
        <div className="text-lg font-semibold">Analyze Repository</div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Ask anything about this repo"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            name="question"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSubmit}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Anylazing..." : "Anylaze !!"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
