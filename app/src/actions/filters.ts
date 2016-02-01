export const SELECT_OWNER = 'SELECT_OWNER'; 
export const SELECT_STATUS = 'SELECT_STATUS'; 

export function selectOwner(owner) {
  return {
    type: SELECT_OWNER,
    payload: owner
  };
}

export function selectStatus(newStatus) {
  return {
    type: SELECT_STATUS,
    payload: newStatus
  };
}
