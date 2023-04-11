import { useState, createContext } from 'react';

import {
	PhoneCallOutline,
	PhoneOffOutline,
	ManagementOutline,
	IntercomFill,
	ConversationOutline,
	QuestionCircleOutline,
} from '../assets/icons';

const ActionContext = createContext();

const ActionProvider = ({ children }) => {
	const [selectedAction, setSelectedAction] = useState(0);

	const handleActionSelect = (index) => {
		setSelectedAction(index);
	};

	const getActions = (sizeIcon) => {
		const actions = [
			{
				name: 'Números Activos',
				icon: (
					<PhoneCallOutline
						className={`${sizeIcon} ${selectedAction === 0 ? 'text-white' : 'text-zinc-800'}`}
					/>
				),
			},
			{
				name: 'Números Bloqueados',
				icon: (
					<PhoneOffOutline
						className={`${sizeIcon} ${selectedAction === 1 ? 'text-white' : 'text-zinc-800'}`}
					/>
				),
			},
			{
				name: 'Gestión Troncales Telefónicos',
				icon: (
					<ManagementOutline
						className={`${sizeIcon} ${selectedAction === 2 ? 'text-white' : 'text-zinc-800'}`}
					/>
				),
			},
			{
				name: 'Intercomunicador',
				icon: (
					<IntercomFill className={`${sizeIcon} ${selectedAction === 3 ? 'text-white' : 'text-zinc-800'}`} />
				),
			},
			{
				name: 'Multi Call Ringing',
				icon: (
					<ConversationOutline
						className={`${sizeIcon} ${selectedAction === 4 ? 'text-white' : 'text-zinc-800'}`}
					/>
				),
			},
			{
				name: 'Log',
				icon: (
					<QuestionCircleOutline
						className={`${sizeIcon} ${selectedAction === 5 ? 'text-white' : 'text-zinc-800'}`}
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
				handleActionSelect,
				getActions,
			}}>
			{children}
		</ActionContext.Provider>
	);
};

export { ActionProvider };

export default ActionContext;
