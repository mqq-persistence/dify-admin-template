// src/features/order/components/order-chat-input.tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import * as Icons from 'lucide-react';

interface OrderChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function OrderChatInput({
  onSend,
  isLoading = false,
  placeholder = '编辑订单编号、物品ID-JSF-2026-0501、备注:XX、P-100库存500件、详情分享中...',
}: OrderChatInputProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input, attachments.length > 0 ? attachments : undefined);
      setInput('');
      setAttachments([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* 文件上传区 */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-lg text-sm"
            >
              <Icons.Paperclip className="w-4 h-4" />
              <span className="truncate">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 输入框 */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        className="w-full min-h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* 操作按钮 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {/* 上传文件 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            title="上传文件"
          >
            <Icons.Paperclip className="w-5 h-5" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".xlsx,.xls,.csv,.pdf,.doc,.docx"
          />

          {/* 新建订单 */}
          <Button variant="ghost" size="sm" title="新建订单">
            <Icons.Plus className="w-5 h-5" />
          </Button>

          {/* 清除记录 */}
          <Button variant="ghost" size="sm" title="清除记录">
            <Icons.RotateCcw className="w-5 h-5" />
          </Button>

          {/* 编辑订单 */}
          <Button variant="ghost" size="sm" title="编辑订单">
            <Icons.Edit2 className="w-5 h-5" />
          </Button>
        </div>

        {/* 发送按钮 */}
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
        >
          <Icons.Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
