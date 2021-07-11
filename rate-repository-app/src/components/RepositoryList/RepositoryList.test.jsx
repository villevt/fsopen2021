import React from "react";
import { render } from "@testing-library/react-native";

import { RepositoryListContainer } from ".";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const {getByTestId, getAllByTestId, debug} = render(<RepositoryListContainer repositories={repositories}/>);
      expect(getByTestId("repositoryList")).toBeDefined();

      const formatCount = count => {
        if (count >= 1000) {
          if (count % 1000 === 0) {
            return count / 1000 + "k"
          } else {
            return (count / 1000).toFixed(1) + "k"
          }
        } else {
          return count
        }
      }

      const texts = getAllByTestId("repositoryItem");
      texts.forEach((e, i) => {
        expect(e).toHaveTextContent(repositories.edges[i].node.fullName);
        expect(e).toHaveTextContent(repositories.edges[i].node.description);
        expect(e).toHaveTextContent(repositories.edges[i].node.language);
      });

      const stats = getAllByTestId("textStat");
      stats.forEach((e, i) => {
        if (!(i % 4)) {
          expect(e).toHaveTextContent(formatCount(repositories.edges[i / 4].node.stargazersCount) + "Stars");
        } else if (!((i - 1) % 4)) {
          expect(e).toHaveTextContent(formatCount(repositories.edges[(i - 1) / 4].node.forksCount) + "Forks");
        } else if (!((i - 2) % 4)) {
          expect(e).toHaveTextContent(formatCount(repositories.edges[(i - 2) / 4].node.reviewCount) + "Reviews");
        } else {
          expect(e).toHaveTextContent(formatCount(repositories.edges[(i - 3) / 4].node.ratingAverage) + "Rating");
        }
      });
    });
  });
});