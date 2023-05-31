const setIntoLS = (keyName, { name, value }) => {
    const newAttribute = { name, value: Number(value) };

    let skills = JSON.parse(localStorage.getItem(keyName)) || [];

    if (skills.some((skill) => skill.name === name)) {
        skills = skills.map((skill) =>
            skill.name === name ? newAttribute : skill
        );
    } else {
        skills.push(newAttribute);
    }

    skills = skills.filter((expertise) => expertise.name !== '');

    return localStorage.setItem(keyName, JSON.stringify(skills));
};

export default setIntoLS;