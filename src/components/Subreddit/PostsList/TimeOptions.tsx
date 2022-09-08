import { Button, Link, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

const TimeOptions = ({ t }: { t: string }) => {
  const defaultTime = "day";
  const router = useRouter();
  const pathNameWithoutQuery = () => {
    const queryStartIndex = router.asPath.indexOf("?");
    if (queryStartIndex !== -1) {
      return router.asPath.substring(0, queryStartIndex);
    } else {
      return router.asPath;
    }
  };

  interface OptionProps {
    href: string;
    text: string;
    time: string;
  }

  const Option = ({ href, text, time }: OptionProps) => {
    return (
      <Button
        size="xs"
        rounded="none"
        color={
          (t === time || (t === undefined && time === defaultTime)) &&
          "teal.500"
        }
      >
        <NextLink href={href} passHref scroll={false}>
          <Link>{text}</Link>
        </NextLink>
      </Button>
    );
  };

  return (
    <HStack my="20px">
      <Text>Links from:</Text>
      <Option
        href={`${pathNameWithoutQuery()}?t=hour`}
        text="Past Hour"
        time="hour"
      />
      <Option
        href={`${pathNameWithoutQuery()}?t=day`}
        text="Past 24 Hours"
        time="day"
      />
      <Option
        href={`${pathNameWithoutQuery()}?t=week`}
        text="Past Week"
        time="week"
      />
      <Option
        href={`${pathNameWithoutQuery()}?t=month`}
        text="Past Month"
        time="month"
      />
      <Option
        href={`${pathNameWithoutQuery()}?t=year`}
        text="Past Year"
        time="year"
      />
      <Option
        href={`${pathNameWithoutQuery()}?t=all`}
        text="All Time"
        time="all"
      />
    </HStack>
  );
};

export default TimeOptions;
