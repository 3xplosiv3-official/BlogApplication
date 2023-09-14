import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// State Interface
interface IState {
  loading?: boolean;
  error?: null | unknown;
  length?: number;
}

// Create Context
const StateContext = createContext<number>(0);

// Handle loading state
function Loading({ children }: { children?: ReactNode }) {
  const state = useContext(StateContext);
  if (state === 0) return <>{children}</>;
}

// Handle error state
function Error({ children }: { children?: ReactNode }) {
  const state = useContext(StateContext);
  if (state === 1) return <>{children}</>;
}

// If no elements
function Empty({ children }: { children?: ReactNode }) {
  const state = useContext(StateContext);
  if (state === 2) return <>{children}</>;
}

// If all ok
function Success({ children }: { children?: ReactNode }) {
  const state = useContext(StateContext);
  if (state === 3) return <>{children}</>;
}

function StateHandler({
  state,
  children,
}: {
  state: IState;
  children: ReactNode;
}) {
  // Set default value for length
  if (state.length === undefined) {
    state.length = 1;
  }
  // Set state code
  const stateCode = state.loading ? 0 : state.error ? 1 : !state.length ? 2 : 3;

  // States
  const [currentState, setCurrentState] = useState<number>(stateCode);

  // Hooks
  useEffect(() => {
    setCurrentState(stateCode);
  }, [stateCode]);

  return (
    <StateContext.Provider value={currentState}>
      {children}
    </StateContext.Provider>
  );
}

StateHandler.Loading = Loading;
StateHandler.Error = Error;
StateHandler.Empty = Empty;
StateHandler.Success = Success;

export default StateHandler;
