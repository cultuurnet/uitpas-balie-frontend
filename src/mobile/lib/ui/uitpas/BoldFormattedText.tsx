export const BoldFormattedText = ({ text }: { text: string }) => {
  if (!text.includes('**')) return [text];

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {' '}
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <strong key={index}>{boldText}</strong>;
        }
        return part;
      })}
    </>
  );
};
