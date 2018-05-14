import { reducer } from '../reducer';
import { actionTypes as t } from '../actionTypes';


const ITEMS_PER_PAGE = 10;
const INITIAL_STATE = {
  activePage: 0,
  startIndex: 0,
  endIndex: 9,
  itemsPerPage: ITEMS_PER_PAGE,
  isRatingDesc: undefined,
  isNameDesc: undefined,
  isOrderPriceDesc: undefined,
  isOnlineNow: true,
  isReachableNow: true,
  activeCategoryFilterName: null,
  allCategories: []
};

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it('should handle INIT_RESTAURANTS', () => {
    expect(
      reducer(
        {},
        {
          type: t.INIT_RESTAURANTS,
          payload: {
            restaurants: {
              data: [{ general: { categories: ['a,b,c'] } }],
              pagination: { total_items: 5 }
            }
          }
        })).toEqual({
      data: [{ general: { categories: ['a,b,c'] }, categoriesArray: ['a', 'b', 'c'] }],
      initialData: [{ general: { categories: ['a,b,c'] }, categoriesArray: ['a', 'b', 'c'] }],
      totalItems: 5,
      totalPages: 1,
      activeCategoryFilterName: null
    });
  });
  it('should handle INIT_RESTAURANTS', () => {
    expect(
      reducer(
        {},
        {
          type: t.INIT_RESTAURANTS,
          payload: {
            restaurants: {
              data: [{ general: { categories: ['-a,@b,!c'] } }],
              pagination: { total_items: 11 }
            }
          }
        })).toEqual({
      data: [{ general: { categories: ['-a,@b,!c'] }, categoriesArray: ['-a', '@b', '!c'] }],
      initialData: [{ general: { categories: ['-a,@b,!c'] }, categoriesArray: ['-a', '@b', '!c'] }],
      totalItems: 11,
      totalPages: 2,
      activeCategoryFilterName: null
    });
  });
  it('should handle INIT_CATEGORIES', () => {
    expect(
      reducer(
        {
          data: [
            { general: { categories: ['1,2,c'] } },
            { general: { categories: ['a,2,c'] } }]
        },
        {
          type: t.INIT_CATEGORIES
        })).toEqual({
      data: [
        { general: { categories: ['1,2,c'] } },
        { general: { categories: ['a,2,c'] } }],
      allCategories: ['1', '2', 'c', 'a']
    });
  });
  it('should handle INIT_RESTAURANTS', () => {
    expect(
      reducer(
        {},
        {
          type: t.INIT_RESTAURANTS,
          payload: {
            restaurants: {
              data: [{ general: { categories: ['a,b,c'] } }],
              pagination: { total_items: 5 }
            }
          }
        })).toEqual({
      data: [{ general: { categories: ['a,b,c'] }, categoriesArray: ['a', 'b', 'c'] }],
      initialData: [{ general: { categories: ['a,b,c'] }, categoriesArray: ['a', 'b', 'c'] }],
      totalItems: 5,
      totalPages: 1,
      activeCategoryFilterName: null
    });
  });
  it('should handle SELECT_PAGE', () => {
    expect(
      reducer(INITIAL_STATE, { type: t.SELECT_PAGE, payload: { page: 2 } })
    ).toEqual({ ...INITIAL_STATE, activePage: 2, startIndex: 20, endIndex: 29 });
  });

  it('should handle SELECT_PAGE', () => {
    expect(
      reducer({ activePage: 5 }, { type: t.SELECT_PAGE, payload: { page: 2 } })
    ).toEqual({ activePage: 2, startIndex: 20, endIndex: 29 });
  });
  it('should handle SELECT_PAGE', () => {
    expect(
      reducer(
        { activePage: 5, startIndex: 50, endIndex: 59 },
        { type: t.SELECT_PAGE, payload: { page: 5 } }
      )
    ).toEqual({ activePage: 5, startIndex: 50, endIndex: 59 });
  });

  it('should handle SORT_BY_RATING_ASC', () => {
    expect(
      reducer(
        { data: [{ 'rating': { 'average': 1.1 } }, { 'rating': { 'average': 1.7 } }, { 'rating': { 'average': 1.2 } }, { 'rating': { 'average': 4.5 } }] },
        { type: t.SORT_BY_RATING_ASC })
    ).toEqual(
      {
        isRatingDesc: false,
        isNameDesc: INITIAL_STATE.isNameDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc,
        data: [{ 'rating': { 'average': 1.1 } }, { 'rating': { 'average': 1.2 } }, { 'rating': { 'average': 1.7 } }, { 'rating': { 'average': 4.5 } }]
      });
  });
  it('should handle SORT_BY_RATING_DESC', () => {
    expect(
      reducer(
        { data: [{ 'rating': { 'average': 1.1 } }, { 'rating': { 'average': 1.7 } }, { 'rating': { 'average': 1.2 } }, { 'rating': { 'average': 4.5 } }] },
        { type: t.SORT_BY_RATING_DESC })
    ).toEqual(
      {
        isRatingDesc: true,
        isNameDesc: INITIAL_STATE.isNameDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc,
        data: [{ 'rating': { 'average': 4.5 } }, { 'rating': { 'average': 1.7 } }, { 'rating': { 'average': 1.2 } }, { 'rating': { 'average': 1.1 } }]
      });
  });
  it('should handle SORT_BY_RATING_DESC', () => {
    expect(
      reducer(
        { data: [{ 'general': { 'name': 'a' } }, { 'general': { 'name': 'c' } }, { 'general': { 'name': 'b' } }, { 'general': { 'name': 'd' } }] },
        { type: t.SORT_BY_NAME_DESC })
    ).toEqual(
      {
        isNameDesc: true,
        isRatingDesc: INITIAL_STATE.isRatingDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc,
        data: [{ 'general': { 'name': 'd' } }, { 'general': { 'name': 'c' } }, { 'general': { 'name': 'b' } }, { 'general': { 'name': 'a' } }]
      });
  });
  it('should handle SORT_BY_NAME_ASC', () => {
    expect(
      reducer(
        { data: [{ 'general': { 'name': 'a' } }, { 'general': { 'name': 'c' } }, { 'general': { 'name': 'b' } }, { 'general': { 'name': 'd' } }] },
        { type: t.SORT_BY_NAME_ASC })
    ).toEqual(
      {
        isNameDesc: false,
        isRatingDesc: INITIAL_STATE.isRatingDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc,
        data: [{ 'general': { 'name': 'a' } }, { 'general': { 'name': 'b' } }, { 'general': { 'name': 'c' } }, { 'general': { 'name': 'd' } }]
      });
  });
  it('should handle TOGGLE_ONLINE_NOW1', () => {
    expect(
      reducer(
        {
          initialData: [
            { general: { open: true, name: 'a' } },
            { general: { open: true, name: 'c' } },
            { general: { open: true, name: 'b' } },
            { general: { open: true, name: 'd' } }]
          ,
          isOnlineNow: true,
          isReachableNow: true
        },
        { type: t.TOGGLE_ONLINE_NOW })
    ).toEqual(
      {
        initialData: [
          { general: { open: true, name: 'a' } },
          { general: { open: true, name: 'c' } },
          { general: { open: true, name: 'b' } },
          { general: { open: true, name: 'd' } }],
        data: [],
        isOnlineNow: false,
        isReachableNow: true,
        totalPages: 0,
        totalItems: 0,
        activePage: 0,
        startIndex: 0,
        endIndex: 9
      });
  });
  it('should handle TOGGLE_ONLINE_NOW2', () => {
    expect(
      reducer(
        {
          initialData: [
            { general: { open: true, name: 'a' } },
            { general: { open: true, name: 'c' } },
            { general: { open: false, name: 'b' } },
            { general: { open: true, name: 'd' } }],
          isOnlineNow: false
        },
        { type: t.TOGGLE_ONLINE_NOW })
    ).toEqual(
      {
        initialData: [
          { general: { open: true, name: 'a' } },
          { general: { open: true, name: 'c' } },
          { general: { open: false, name: 'b' } },
          { general: { open: true, name: 'd' } }],
        data: [
          { general: { open: true, name: 'a' } },
          { general: { open: true, name: 'c' } },
          { general: { open: true, name: 'd' } }],
        isOnlineNow: true,
        totalPages: 1,
        totalItems: 3,
        activePage: 0,
        startIndex: 0,
        endIndex: 9
      });
  });
  it('should handle TOGGLE_REACHABLE_NOW', () => {
    expect(
      reducer(
        {
          initialData: [
            { general: { reachable: true, name: 'a' } },
            { general: { reachable: true, name: 'c' } },
            { general: { reachable: true, name: 'b' } },
            { general: { reachable: true, name: 'd' } }],
          isReachableNow: true
        },
        { type: t.TOGGLE_REACHABLE_NOW })
    ).toEqual(
      {
        initialData: [
          { general: { reachable: true, name: 'a' } },
          { general: { reachable: true, name: 'c' } },
          { general: { reachable: true, name: 'b' } },
          { general: { reachable: true, name: 'd' } }],
        data: [],
        isReachableNow: false,
        totalPages: 0,
        totalItems: 0,
        activePage: 0,
        startIndex: 0,
        endIndex: 9
      });
  });
  it('should handle TOGGLE_REACHABLE_NOW', () => {
    expect(
      reducer(
        {
          initialData: [
            { general: { reachable: true, name: 'a' } },
            { general: { reachable: true, name: 'c' } },
            { general: { reachable: true, name: 'b' } },
            { general: { reachable: true, name: 'd' } }],
          isReachableNow: false
        },
        { type: t.TOGGLE_REACHABLE_NOW })
    ).toEqual(
      {
        initialData: [
          { general: { reachable: true, name: 'a' } },
          { general: { reachable: true, name: 'c' } },
          { general: { reachable: true, name: 'b' } },
          { general: { reachable: true, name: 'd' } }],
        data: [
          { general: { reachable: true, name: 'a' } },
          { general: { reachable: true, name: 'c' } },
          { general: { reachable: true, name: 'b' } },
          { general: { reachable: true, name: 'd' } }],
        isReachableNow: true,
        totalPages: 1,
        totalItems: 4,
        activePage: 0,
        startIndex: 0,
        endIndex: 9
      });
  });
  it('should handle TOGGLE_REACHABLE_NOW', () => {
    expect(
      reducer(
        {
          initialData: [
            { general: { reachable: true, name: 'a' } },
            { general: { reachable: false, name: 'c' } },
            { general: { reachable: true, name: 'b' } },
            { general: { reachable: true, name: 'd' } }],
          isReachableNow: false
        },
        { type: t.TOGGLE_REACHABLE_NOW })
    ).toEqual(
      {
        initialData: [
          { general: { reachable: true, name: 'a' } },
          { general: { reachable: false, name: 'c' } },
          { general: { reachable: true, name: 'b' } },
          { general: { reachable: true, name: 'd' } }],
        data: [
          { general: { reachable: true, name: 'a' } },
          { general: { reachable: true, name: 'b' } },
          { general: { reachable: true, name: 'd' } }],
        isReachableNow: true,
        totalPages: 1,
        totalItems: 3,
        activePage: 0,
        startIndex: 0,
        endIndex: 9
      });
  });
  it('should handle FILTER_BY_CATEGORY', () => {
    expect(
      reducer(
        {
          initialData: [
            { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } },
            { categoriesArray: ['c3', 'c4', 'c5'], general: { reachable: false, name: 'c' } },
            { categoriesArray: ['c5'], general: { reachable: true, name: 'b' } },
            { categoriesArray: ['c*'], general: { reachable: true, name: 'd' } }]

        },
        { payload: { categoryName: 'c2' }, type: t.FILTER_BY_CATEGORY })
    ).toEqual(
      {
        initialData: [
          { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } },
          { categoriesArray: ['c3', 'c4', 'c5'], general: { reachable: false, name: 'c' } },
          { categoriesArray: ['c5'], general: { reachable: true, name: 'b' } },
          { categoriesArray: ['c*'], general: { reachable: true, name: 'd' } }],
        data: [
          { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } }
        ],
        activeCategoryFilterName: 'c2',
        totalPages: 1,
        totalItems: 1,
        activePage: 0,
        startIndex: 0,
        endIndex: 9,
        isOnlineNow: true,
        isReachableNow: true
      });
  });

  it('should handle FILTER_BY_CATEGORY', () => {
    expect(
      reducer(
        {
          initialData: [
            { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } },
            { categoriesArray: ['c3', 'c4', 'c5'], general: { reachable: false, name: 'c' } },
            { categoriesArray: ['c5'], general: { reachable: true, name: 'b' } },
            { categoriesArray: ['c*'], general: { reachable: true, name: 'd' } }]

        },
        { payload: { categoryName: 'c3' }, type: t.FILTER_BY_CATEGORY })
    ).toEqual(
      {
        initialData: [
          { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } },
          { categoriesArray: ['c3', 'c4', 'c5'], general: { reachable: false, name: 'c' } },
          { categoriesArray: ['c5'], general: { reachable: true, name: 'b' } },
          { categoriesArray: ['c*'], general: { reachable: true, name: 'd' } }],
        data: [
          { categoriesArray: ['c1', 'c2', 'c3'], general: { reachable: true, name: 'a' } },
          { categoriesArray: ['c3', 'c4', 'c5'], general: { reachable: false, name: 'c' } }
        ],
        activeCategoryFilterName: 'c3',
        totalPages: 1,
        totalItems: 2,
        activePage: 0,
        startIndex: 0,
        endIndex: 9,
        isOnlineNow: true,
        isReachableNow: true
      });
  });

});
