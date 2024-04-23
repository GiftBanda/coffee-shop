import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
    persist((set, get) => ({
            CoffeeList: CoffeeData,
            BeansList: BeansData,
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (item: any) =>
                set(
                    produce((state) => {
                        let found = false;
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id === item.id) {
                                state.CartList[i].quantity++;
                                found = true;
                                let size = false;
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size === item.prices[0].size) {
                                        state.CartList[i].prices[j].quantity++;
                                        size = true;
                                        break;
                                    }
                                }
                                if (size === false) {
                                    state.CartList[i].prices.push(item.prices[0]);
                                }
                                state.CartPrice[i].prices.sort((a: any, b: any) => {
                                    if (a.size > b.size) {
                                        return -1;
                                    }
                                    if (a.size < b.size) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                break;
                            }
                        }
                        if (found === false) {
                            state.CartList.push(item);
                        }
                    })
                ),
                calculateCartPrice: () => set(
                    produce((state) => {
                        let totalPrice = 0;
                        for (let i = 0; i < state.CartList.length; i++) {
                            let tempPrice = 0;
                            for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                //tempPrice += state.CartList[i].prices[j].price * state.CartList[i].prices[j].quantity;
                                tempPrice = tempPrice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
                            }
                            state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                            totalPrice = totalPrice + tempPrice;
                        }
                        state.CartPrice = totalPrice.toFixed(2).toString();
                    }),
                ),
            addToFavorites: (type:string ,id: string) => set(produce((state) => {
                if (type === 'Coffee') {
                    //state.FavoritesList.push(get().CoffeeList[id]);

                    for (let i = 0; i < state.CoffeeList.length; i++) {
                        if (state.CoffeeList[i].id === id) {
                            if (state.CoffeeList[i].favorite === false) {
                                state.CoffeeList[i].favorite = true;
                                state.FavoritesList.unshit(state.CoffeeList[i]);
                            }
                        }
                        break;
                    }
                } else if (type === 'Bean'){
                    for (let i = 0; i < state.BeanList.length; i++) {
                        if (state.BeanList[i].id === id) {
                            if (state.BeanList[i].favorite === false) {
                                state.BeanList[i].favorite = true;
                                state.FavoritesList.unshit(state.BeanList[i]);
                            }
                        }
                        break;
                    }
                }
            }
            )),

        }),
        {name: 'coffee-app', storage:createJSONStorage(() => AsyncStorage)}
    )
);
