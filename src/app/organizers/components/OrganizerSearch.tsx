import { useState } from 'react';

import { useGetCardSystems } from '@/shared/lib/dataAccess/uitpas/generated/card-systems/card-systems';
import { Button, Card, CardContent, InputGroup, InputGroupInput } from '@/ui';
import { Label } from '@/ui/shadcn/label';

type CardSystemCardProps = {
  name: string;
  email?: string;
};

const CardSystemCard = ({ name, email }: CardSystemCardProps) => {
  return (
    <Card>
      <CardContent>
        <p>{name}</p>
      </CardContent>
    </Card>
  );
};

const OrganizerSearch = () => {
  const [postalCode, setPostalCode] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useGetCardSystems(
    { postalCode: [searchValue] },
    { query: { enabled: searchValue.length > 0 } },
  );

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="organizer-search" className="">
        Zoek je contactpersoon
      </Label>
      <div className="flex flex-row gap-3">
        <InputGroup>
          <InputGroupInput
            placeholder="Postcode..."
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </InputGroup>
        <Button onClick={() => setSearchValue(postalCode)}>Opzoeken</Button>
      </div>
      <CardSystemCard name="hello" />
      <ul>{}</ul>
    </div>
  );
};

export { OrganizerSearch };
