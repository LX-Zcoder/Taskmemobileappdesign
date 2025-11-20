import { motion } from "motion/react";
import { Plus, StickyNote } from "lucide-react";
import { useState } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
}

interface NotesPageProps {
  notes: Note[];
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string) => void;
}

const NOTE_COLORS = [
  { id: "yellow", bg: "bg-yellow-100", text: "text-yellow-900", border: "border-yellow-200" },
  { id: "green", bg: "bg-green-100", text: "text-green-900", border: "border-green-200" },
  { id: "blue", bg: "bg-blue-100", text: "text-blue-900", border: "border-blue-200" },
  { id: "pink", bg: "bg-pink-100", text: "text-pink-900", border: "border-pink-200" },
  { id: "purple", bg: "bg-purple-100", text: "text-purple-900", border: "border-purple-200" },
];

export function NotesPage({ notes, onAddNote, onDeleteNote, onEditNote }: NotesPageProps) {
  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-right">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-foreground">ملاحظاتي</h1>
          {notes.length > 0 && (
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-primary font-semibold">{notes.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <StickyNote className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد ملاحظات</p>
            <p className="text-sm text-muted-foreground mt-1">اضغط على الزر لإضافة ملاحظة جديدة</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {notes.map((note, index) => {
              // Check if color is custom (starts with #)
              const isCustomColor = note.color.startsWith('#');
              const colorScheme = isCustomColor 
                ? null 
                : NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
              
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onEditNote(note.id)}
                  className={`${isCustomColor ? '' : colorScheme?.bg} ${isCustomColor ? '' : colorScheme?.border} rounded-3xl p-4 shadow-sm border-2 cursor-pointer min-h-[180px] flex flex-col`}
                  style={isCustomColor ? { 
                    backgroundColor: note.color,
                    borderColor: note.color,
                    filter: 'brightness(1.05)'
                  } : {}}
                >
                  <h3 className={`${isCustomColor ? 'text-gray-900' : colorScheme?.text} mb-2 line-clamp-2`}>
                    {note.title || "بدون عنوان"}
                  </h3>
                  <p className={`${isCustomColor ? 'text-gray-800' : colorScheme?.text} opacity-80 text-sm line-clamp-4 flex-1`}>
                    {note.content}
                  </p>
                  <div className={`${isCustomColor ? 'text-gray-700 border-gray-400' : `${colorScheme?.text} ${colorScheme?.border}`} opacity-60 text-xs mt-2 pt-2 border-t`}>
                    {new Date(note.createdAt).toLocaleDateString('ar-EG', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddNote}
        className="fixed left-6 bottom-24 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-10"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}