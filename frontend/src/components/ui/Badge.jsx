// ============================================
// Badge Component — Status/Priority Badges
// ============================================
// Small colored badges for displaying task status or priority.

import { STATUS_COLORS, PRIORITY_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';

export const StatusBadge = ({ status }) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const label = STATUS_LABELS[status] || status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {label}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const colors = PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
  const label = PRIORITY_LABELS[priority] || priority;

  const icons = {
    low: '↓',
    medium: '→',
    high: '↑',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      {icons[priority]} {label}
    </span>
  );
};
