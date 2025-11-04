import {create} from "zustand/react";

interface NeuronStateInterface {
    neuronCategoryList: object[];
    fetchNeuronCategoryList(): Promise<void>;
    examList: object[];
    fetchExamList():Promise<void>;
}

const NeuronState = create<NeuronStateInterface>((set)=>({
    neuronCategoryList:[],
    fetchNeuronCategoryList: async ()=>{
        const response = await fetch("/api/neuron/category");
        const data = await response.json();
        set({neuronCategoryList:data.data});
        return data;
    },
    examList:[],
    fetchExamList:async ()=>{
        const response = await fetch("/api/neuron/exam");
        const data = await response.json();
        set({examList:data.data});
        return data;
    }








}));

export default NeuronState;