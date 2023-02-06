const state = () => ({
  employees: [
    {
      name: 'Новиков Тимур Вадимович',
      position: 'Хирург-имплантолог',
      image: 'novikov-timur-vadimovich',
      expirience: 'Стаж работы более 21 года',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Лебедев Михаил Даниилович',
      position: 'Терапевт, эндодонтист',
      image: 'lebedev-mihail-daniilovich',
      expirience: 'Стаж работы более 11 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Виноградов Илья Владимирович',
      position: 'Хирург-имплантолог',
      image: 'vinogradov-ilya-vladimirovich',
      expirience: 'Стаж работы более 5 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Сотников Алексей Алексеевич',
      position: 'Ортодонт',
      image: 'sotnikov-aleksej-alekseevich',
      expirience: 'Стаж работы более 7 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Рыбаков Семён Ярославович',
      position: 'Ортопед',
      image: 'rybakov-semyon-yaroslavovich',
      expirience: 'Стаж работы более 12 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Ермилова Ева Леонидовна',
      position: 'Хирург-имплантолог',
      image: 'ermilova-eva-leonidovna',
      expirience: 'Стаж работы более 13 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
    {
      name: 'Виноградов Илья Владимирович',
      position: 'Хирург-имплантолог',
      image: 'vinogradov-ilya-ladimirovich',
      expirience: 'Стаж работы более 16 лет',
      description:
        'Прошёл множество стажировок в мировых стоматологических клиниках. Занимается имплантацией в полном объеме разными зарубежными системами. Специализируется на синус-лифтинге, мгновенной имплантации, применение лазера, пластика и операции на пародонте, а также пьезохирургии.',
    },
  ],
})

export type OurTeamState = ReturnType<typeof state>

export default state
