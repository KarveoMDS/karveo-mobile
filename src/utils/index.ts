export const pluralize = (count: number, word: string) => {
  return count > 1 ? `${word}s` : word;
};

export const pluralizeNumber = (number: string) => {
  return number.length > 1 ? number : `0${number}`;
};

export const availableHeures = [
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
];

export const availableDuree = ['00', '01', '02', '03', '04', '05', '06'];

export const availableMinutes = ['00', '15', '30', '45'];

export const getAvailableHours = (school: any) => {
  return availableHeures.filter((heure) => {
    const {openingHour, closingHour} = school;
    const heureInt = parseInt(heure, 10);
    return heureInt >= openingHour && heureInt < closingHour;
  })
}

export const getAvailableHourDuration = (school: any, heure: any) => {
  return availableDuree.filter((dureeHeure) => {
    if (!heure) return true;
    const {openingHour, closingHour} = school;
    const dureeHeureInt = parseInt(dureeHeure, 10);
    const heureInt = parseInt(heure, 10);
    return heureInt + dureeHeureInt <= closingHour;
  })
}

export const getAvailableMinutesDuration = (school: any, heure: any, dureeHeure: any, minute: any) => {
  return availableMinutes.filter((dureeMinute) => {
    if (!heure || !dureeHeure) return true;
    const {closingHour} = school;
    const dureeMinuteInt = parseInt(dureeMinute, 10);
    const dureeHeureInt = parseInt(dureeHeure, 10);
    const heureInt = parseInt(heure, 10);
    const minuteInt = parseInt(minute || '0', 10);

    // Calcule le total des minutes et convertit en heures si nécessaire
    const totalMinutes = heureInt * 60 + dureeHeureInt * 60 + dureeMinuteInt + minuteInt;
    const totalHeures = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (dureeHeureInt === 0 && dureeMinuteInt === 0) return false;

    // Vérifie si l'heure totale est inférieure à l'heure de fermeture,
    // et si les minutes restantes sont 0 lorsque l'heure totale est égale à l'heure de fermeture
    return (
        totalHeures < closingHour ||
        (totalHeures === closingHour && remainingMinutes === 0)

    );
  })
}
