# ADR 0004: Integrate React Query with Zustand Store for Tracks Data

Currently, data fetching for tracks is done directly in the hook `useTracksListController` using React Query (`useTracks`). However, it was suggested to separate data fetching logic and state management by introducing a shared store.

## Decision

Create a dedicated Zustand store (`useTracksStore`) to hold tracks data (`data`, `isLoading`, `error`) globally.  
A new custom hook `useTracksWithStore(filters)` will be introduced to bridge React Query and Zustand.

This hook will:

- Fetch tracks data using `useTracks(filters)`
- Sync fetched data, loading, and error states to the Zustand store

### Usage options

- Use `useTracksWithStore()` in components where both fetch and store sync are needed.
- Use `useTracksStore()` in components that only consume already-fetched tracks data.

#### Example

```ts
export const useTracksWithStore = (filters: TracksRequestQueryParams) => {
  const { setData, setError, setIsLoading } = useTracksStore();
  const query = useTracks(filters);

  useEffect(() => {
    setData(query.data ?? null);
    setError(query.error ?? null);
    setIsLoading(query.isLoading);
  }, [query.data, query.error, query.isLoading]);

  return query;
};
```

## Rationale

- Decouples data fetching from component logic.
- Promotes a single source of truth for tracks state, allowing easy sharing across multiple components.
- Improves scalability and maintainability in larger applications.
- Provides flexibility: fetch logic can be centralized (e.g., in a layout or root feature component), while other parts of the app simply consume store state.

## Status

Proposed

## Consequences

**Positive:**

- Centralized and reusable tracks state.
- Simplified consumption of data in child components.
- Easier to test and maintain.

**Negative:**

- Slightly increased complexity due to store-sync logic.
- Risk of stale state if not properly managed.