import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const heroesApiSlice = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Heroes'],
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes'],
        }),
        createHero: builder.mutation({
            query: (newHero) => ({
                url: '/heroes',
                method: 'POST',
                body: newHero,
            }),
            invalidatesTags: ['Heroes'],
        }),
        deleteHero: builder.mutation({
            query: (id) => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes'],
        }),
        getFilters: builder.query({
            query: () => '/filters',
        }),
    }),
});

export const {
    useGetHeroesQuery,
    useCreateHeroMutation,
    useDeleteHeroMutation,
    useGetFiltersQuery,
} = heroesApiSlice;