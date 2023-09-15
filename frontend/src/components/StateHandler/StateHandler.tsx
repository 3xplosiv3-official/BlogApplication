import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ResponseState } from "../../types";

// State Interface
interface IState {
  loading?: boolean;
  error?: null | unknown;
  length?: number;
}

// Create Context
const StateContext = createContext<ResponseState>(ResponseState.Loading);

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

  // State code
  const stateCode = (() => {
    if (state.loading) return ResponseState.Loading;
    if (state.error) return ResponseState.Error;
    if (!state.length) return ResponseState.Empty;
    return ResponseState.Success;
  })();

  const [currentState, setCurrentState] = useState<ResponseState>(stateCode);

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

function StateComponent({
  stateCode,
  children,
}: {
  stateCode: ResponseState;
  children?: ReactNode;
}) {
  const state = useContext(StateContext);
  return state === stateCode ? <>{children}</> : null;
}

StateHandler.Loading = (props: { children: ReactNode }) => (
  <StateComponent stateCode={ResponseState.Loading} {...props} />
);

StateHandler.Error = (props: { children: ReactNode }) => (
  <StateComponent stateCode={ResponseState.Error} {...props} />
);

StateHandler.Empty = (props: { children: ReactNode }) => (
  <StateComponent stateCode={ResponseState.Empty} {...props} />
);

StateHandler.Success = (props: { children: ReactNode }) => (
  <StateComponent stateCode={ResponseState.Success} {...props} />
);

export default StateHandler;
