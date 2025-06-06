"use client";

import { api } from "@/trpc/react";
import React, { useState } from "react";

const SavedAnswer = () => {
  const { data: savedQuestionData, isLoading } =
    api.saveQuestion.getQuestionAnswer.useQuery();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        // Skeleton Loader
        <div>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="mb-4 rounded-md border border-gray-200 bg-white p-4 shadow transition duration-300 hover:shadow-md"
            >
              <div className="mb-2 flex animate-pulse">
                <div className="h-6 w-6 rounded-lg bg-red-200"></div>
                <div className="ml-3 h-6 w-2/3 rounded bg-gray-200"></div>
              </div>
              <div className="flex animate-pulse">
                <div className="h-6 w-6 rounded-lg bg-blue-200"></div>
                <div className="ml-3 h-10 w-full rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        savedQuestionData &&
        savedQuestionData.map((data, index) => (
          <div
            key={index}
            className="mb-4 rounded-md border border-gray-200 bg-white p-4 shadow transition duration-300 hover:shadow-md"
          >
            {/* Question Section */}
            <h3 className="mb-2 flex">
              <div className="rounded-lg bg-red-100/70 px-3 py-1 font-bold text-red-600">
                Q
              </div>
              <div className="ml-3 text-xl font-bold">{data.question}</div>
            </h3>

            {/* Answer Section */}
            <div
              onClick={() => toggleExpand(index)}
              className={`flex overflow-hidden transition-all duration-700 cursor-pointer ${
                expandedIndex === index ? "max-h-full" : "max-h-16"
              }`}
            >
              <div className="h-8 rounded-lg bg-blue-100/80 px-3 py-1 font-bold text-green-600">
                A
              </div>
              <div className="ml-3">
                <p className="text-gray-600">
                  {expandedIndex !== index
                    ? `${data.answer.slice(0, 260)}....`
                    : `${data.answer}`}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedAnswer;
