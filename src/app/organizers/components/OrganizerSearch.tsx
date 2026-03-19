import { Button, InputGroup, InputGroupInput } from '@/ui';
import { Label } from '@/ui/shadcn/label';

type Props = {};

const OrganizerSearch = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Label htmlFor="organizer-search" className="">
          Zoek je contactpersoon
        </Label>
        <div className="flex flex-row gap-3">
          <InputGroup>
            <InputGroupInput id="organizer-search" placeholder="Postcode" />
          </InputGroup>
          <Button>Opzoeken</Button>
        </div>
      </div>
    </>
  );
};

export { OrganizerSearch };
