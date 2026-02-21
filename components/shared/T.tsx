import useTranslate from "@/hooks/useTranslate";

const T = ({ text }: { text: string }) => {
  const translation = useTranslate(text);

  return <span>{translation}</span>;
};

export default T;
