import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Counter } from '@/store/counterStore';

type OrganizerSelectorRowProps = {
  organizer: NonNullable<Counter>;
  onClick: () => void;
};

const OrganizerSelectorRow = ({
  organizer,
  onClick,
}: OrganizerSelectorRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-[0_2px_3px_var(--color-gray-200)] transition-all duration-150 hover:bg-gray-200"
  >
    <div className="min-w-0">
      <p className="truncate">{organizer.name}</p>
      {organizer.cardSystems && organizer.cardSystems.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {organizer.cardSystems
            .slice(0, 3)
            .map((cs) => cs.name)
            .join(', ')}
          {organizer.cardSystems.length > 3 && ', ...'}
        </p>
      )}
    </div>
    <FontAwesomeIcon
      icon={faChevronRight}
      className="shrink-0 text-muted-foreground"
      size="sm"
    />
  </button>
);

export { OrganizerSelectorRow };
