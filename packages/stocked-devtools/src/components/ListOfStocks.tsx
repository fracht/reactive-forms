import { useContext } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

import { AppEvents, AppStateContext } from './AppStateContext';

export const ListOfStocks = () => {
    const { stocks, selectedStockId, dispatch } = useContext(AppStateContext);

    const pickStock = (id: number) => {
        dispatch({ event: AppEvents.PICK_STOCK, data: id });
    };

    return (
        <List>
            {Object.values(stocks).map(({ name, id }) => (
                <ListItemButton selected={id === selectedStockId} onClick={() => pickStock(+id)} key={id}>
                    <ListItemText>{name}</ListItemText>
                </ListItemButton>
            ))}
        </List>
    );
};
