import { Box } from '@/web/lib/ui';

export const BoldFormattedText = ({ text }: { text: string }) => {
  if (!text.includes('**')) return [text];

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {' '}
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return (
            <Box fontWeight="fontWeightBold" display="inline" key={index}>
              {boldText}
            </Box>
          );
        }
        return part;
      })}
    </>
  );
};
