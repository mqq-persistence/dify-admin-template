// src/features/order/components/quick-commands.tsx
'use client';

import { Button } from '@/shared/ui/button';
import * as Icons from 'lucide-react';

interface QuickCommandsProps {
  onCommandSelect: (command: string) => void;
}

const QUICK_COMMANDS = [
  {
    id: 'view-orders',
    label: '查看订单问询',
    icon: Icons.Eye,
    color: 'blue',
  },
  {
    id: 'track-shipment',
    label: '物流查询',
    icon: Icons.Truck,
    color: 'green',
  },
  {
    id: 'query-status',
    label: '查询订单状态',
    icon: Icons.CheckCircle,
    color: 'purple',
  },
  {
    id: 'bulk-import',
    label: '批量导入',
    icon: Icons.Upload,
    color: 'orange',
  },
];

export function QuickCommands({ onCommandSelect }: QuickCommandsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6 space-y-4">
      <h3 className="text-center font-semibold text-gray-900 dark:text-white">快速命令</h3>
      <div className="grid grid-cols-2 gap-3">
        {QUICK_COMMANDS.map((command) => {
          const Icon = command.icon;
          const colorClasses = {
            blue: 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700',
            green:
              'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700',
            purple:
              'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700',
            orange:
              'bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-700',
          };

          return (
            <Button
              key={command.id}
              onClick={() => onCommandSelect(command.id)}
              className={`${colorClasses[command.color as keyof typeof colorClasses]} border-0 h-auto py-3 flex flex-col items-center gap-2`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center">{command.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
