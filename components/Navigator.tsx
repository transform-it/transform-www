import React, { useCallback, Fragment } from "react";
import { Heading, Pane, Text, Autocomplete, SearchInput } from "evergreen-ui";
import { categorizedRoutes, Route, routes } from "@utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function() {
  const router = useRouter();

  const onSearchSelect = useCallback(changedItem => {
    const route = routes.find(route => changedItem === route.searchTerm);
    router.push(route.path);
  }, []);

  return (
    <Pane
      width={240}
      height={"100vh"}
      borderRight
      display="flex"
      flexDirection="column"
    >
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={20}
        paddingY={20}
      >
        <Heading size={900}>Transform</Heading>
      </Pane>

      <Pane paddingX={15}>
        <Autocomplete
          onChange={onSearchSelect}
          items={routes.map(a => a.searchTerm)}
          width="100%"
        >
          {props => {
            const { getInputProps, getRef, inputValue } = props;
            return (
              <SearchInput
                width="100%"
                marginBottom={10}
                placeholder="Search"
                value={inputValue}
                innerRef={getRef}
                {...getInputProps()}
              />
            );
          }}
        </Autocomplete>
      </Pane>

      <Pane
        display="flex"
        flex={1}
        overflowY="scroll"
        flexDirection="column"
        paddingBottom={10}
      >
        {categorizedRoutes.map(route => {
          return (
            <Fragment key={route.category}>
              <Pane paddingX={10} marginTop={15} marginBottom={2}>
                <Heading marginLeft={5} size={400}>
                  {route.category}
                </Heading>
              </Pane>

              {(route.content as Route[]).map((a: Route) => {
                const isActive = router.pathname === a.path;
                return (
                  <Link key={a.label} href={a.path} prefetch>
                    <a
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      <Pane
                        paddingLeft={16}
                        paddingY={3}
                        backgroundColor={isActive ? "#f3f3f3" : undefined}
                        borderLeft={
                          isActive
                            ? "3px solid #009688"
                            : "3px solid transparent"
                        }
                        css={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5"
                          }
                        }}
                      >
                        <Text fontSize={13}>{a.label}</Text>
                      </Pane>
                    </a>
                  </Link>
                );
              })}
            </Fragment>
          );
        })}
      </Pane>

      <Pane paddingY={15} background="#f6f6f6" borderTop>
        <Heading size={400} textAlign="center">
          Created by{" "}
          <Link href="https://twitter.com/ritz078">
            <a target="_blank">@ritz078</a>
          </Link>
        </Heading>
      </Pane>
    </Pane>
  );
}