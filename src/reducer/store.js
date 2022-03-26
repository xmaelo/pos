
const defaultState = {
    username: null,
    role: {},
    header: '',
    user: null,
    tables: [],
    consommables: [],
    socket: null,
    loading: false,
    cart: [],
    status: {}
  };
  
  
  export default function store(state = defaultState, action) {
    switch (action.type) {
      case 'CART':
        const s = { ...state, cart: action.data }
        console.log('set card', 123)
        return {...s}
      case 'SAVE_HEADER':
        return { ...state, header: action.token };
      case 'SAVE_USER':
        return { ...state, role: action.user.role, user: action.user };
      case 'SAVE_CONSO':
        return { ...state, consommables: action.consommables };
      case 'SAVE_SOCKET':
        return { ...state, socket: action.socket };   
      case 'SAVE_TABLE':
        return { ...state, tables: action.tables };
      case 'STATUS':
        return { ...state, status: action.data };
      case 'LOANDING':
        return { ...state, loading: action.stop? false : !state.loading };
      
            
      default:
        return {...state};
    }
  }
  