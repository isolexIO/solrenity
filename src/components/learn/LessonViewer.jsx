import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';

export default function LessonViewer({ lesson, onNext, onPrevious, onComplete, isFirst, isLast, isCompleted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-[#1A1A2E] border-white/10 p-8">
        {/* Lesson Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#9945FF]/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#9945FF]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
            <p className="text-white/60 text-sm">{lesson.duration}</p>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="prose prose-invert max-w-none mb-8">
          {lesson.content.map((section, idx) => (
            <div key={idx} className="mb-6">
              {section.type === 'heading' && (
                <h3 className="text-xl font-semibold text-white mb-3">{section.text}</h3>
              )}
              {section.type === 'paragraph' && (
                <p className="text-white/80 leading-relaxed mb-4">{section.text}</p>
              )}
              {section.type === 'list' && (
                <ul className="space-y-2 mb-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-white/80 flex items-start gap-2">
                      <span className="text-[#14F195] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.type === 'highlight' && (
                <div className="bg-[#9945FF]/10 border border-[#9945FF]/30 rounded-lg p-4 mb-4">
                  <p className="text-[#9945FF] font-medium">{section.text}</p>
                </div>
              )}
              {section.type === 'code' && (
                <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm text-white/90 overflow-x-auto">
                  <pre>{section.text}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {!isLast ? (
            <Button
              onClick={onNext}
              className="bg-[#9945FF] hover:bg-[#9945FF]/90 text-white"
            >
              Next Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              className="bg-[#14F195] hover:bg-[#14F195]/90 text-black"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete Module
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}