import { RequestAccess } from '@/@core/modules/authentication/domain/requestAccess.entities';
import { create } from 'zustand';

interface ILoggedStore {
    logged: boolean;
    info: RequestAccess | null;
    setLogged: (logged: boolean) => void;
    setInfo: (info: RequestAccess) => void;
}

const loggedStore = create<ILoggedStore>((set) => ({
    logged: false,
    info: null,
    setLogged: (logged) => set({ logged }),
    setInfo: (info) => set({ info }),
}));

export {
    loggedStore,
};
