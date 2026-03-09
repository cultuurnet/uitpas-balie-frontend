import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Organizer } from '@/shared/lib/dataAccess';

type CounterSelectorRowProps = {
  organizer: Organizer;
  onClick: () => void;
};

const CounterSelectorRow = ({
  organizer,
  onClick,
}: CounterSelectorRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-md border bg-white px-4 py-3 text-left hover:bg-gray-50"
  >
    <div>
      <p>{organizer.name}</p>
      <p className="text-sm text-muted-foreground">UiTPAS Regio</p>
    </div>
    <FontAwesomeIcon
      icon={faChevronRight}
      className="shrink-0 text-muted-foreground"
      size="sm"
    />
  </button>
);

export { CounterSelectorRow };
