import { createContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  ConversationOutline,
  IntercomFill,
  ManagementOutline,
  NotebookFill,
  PhoneCallOutline,
  QuestionCircleOutline,
  UserFill,
} from '../assets/icons';

const ActionContext = createContext();

const ActionProvider = ({ children }) => {
  const [selectedAction, setSelectedAction] = useState(0);
  const [selectedActionUsers, setSelectActionUsers] = useState(null);
  const [selectedActionPhones, setSelectActionPhones] = useState(0);
  const mobileScreen = useMediaQuery({ maxWidth: 1024 });

  const getActions = (sizeIconLarge, sizeIconSmall) => {
    const actions = [
      {
        id: 2,
        name: 'Gestión de Anexos',
        icon: (
          <NotebookFill
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 0 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
      {
        id: 3,
        name: 'Gestión Troncales',
        icon: (
          <ManagementOutline
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 1 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
      {
        id: 4,
        name: 'Intercomunicador',
        icon: (
          <IntercomFill
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 2 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
      {
        id: 5,
        name: 'Multi Call Ringing',
        icon: (
          <ConversationOutline
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 3 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
      {
        id: 6,
        name: 'Cuentas de Usuario',
        icon: (
          <UserFill
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 4 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
      {
        id: 7,
        name: 'Log',
        icon: (
          <QuestionCircleOutline
            className={`${mobileScreen ? sizeIconSmall : sizeIconLarge} ${
              selectedAction === 5 ? 'text-white' : 'text-zinc-800'
            }`}
          />
        ),
      },
    ];

    return actions;
  };

  return (
    <ActionContext.Provider
      value={{
        selectedAction,
        setSelectedAction,
        getActions,
        setSelectActionUsers,
        selectedActionUsers,
        setSelectActionPhones,
        selectedActionPhones,
      }}>
      {children}
    </ActionContext.Provider>
  );
};

export { ActionProvider };

export default ActionContext;
