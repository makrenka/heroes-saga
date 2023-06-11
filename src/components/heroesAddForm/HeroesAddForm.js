// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> сформировать на базе данных из фильтров (без Все)

import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useCreateHeroMutation, useGetFiltersQuery } from "../../api/heroesApiSlice";

export const HeroesAddForm = () => {
  const {
    data: filters = [],
    isLoading,
    isError,
  } = useGetFiltersQuery();

  const [heroName, setHeroName] = useState('');
  const [heroDescr, setHeroDescr] = useState('');
  const [heroElement, setHeroElement] = useState('');

  const [createHero] = useCreateHeroMutation();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newHero = {
      id: nanoid(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    createHero(newHero).unwrap();

    setHeroName('');
    setHeroDescr('');
    setHeroElement('');
  };

  const renderFilters = (filters) => {
    if (isLoading) {
      return <option>Загрузка элементов</option>
    } else if (isError) {
      return <option>Ошибка загрузки</option>
    };

    if (filters.length) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === 'all') return;
        return (
          <option key={name} value={name}>
            {label}
          </option>
        )
      })
    }
  }

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};