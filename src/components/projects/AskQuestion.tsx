"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useProjects from "@/hooks/use-projects";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import MDeditor from "@uiw/react-md-editor";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const { selectedProject } = useProjects();

  const handleSubmit = async () => {
    if (question.trim() == "") {
      return;
    }
    if (!selectedProject) return;
    toast.success("Hoo gyaa bhai ");
    setLoading(true);
    setOpen(true);
    try {
      const { output } = await askQuestion(
        question,
        selectedProject.id,
        selectedProject.githubUrl,
      );

      console.log(output);

      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setAnswer((prev) => prev + delta);
        }
      }

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
            <DialogTitle> GitInsite </DialogTitle>
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
        <div className="mb-2 text-lg font-semibold">Analyze Repository</div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="https://github.com/username/repository"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            name="question"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSubmit}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Analyze !!
          </Button>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
