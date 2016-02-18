export const SKILL_UPDATED = 'SKILL_UPDATED';

export function updateSkill(person, skillName, skillLevel) {
  return {
    type: SKILL_UPDATED,
    payload: { person, skillName, skillLevel}
  };
};

export default { updateSkill }
