export class ApiCaller {

    public static readonly baseUrl = "http://localhost:3000/api";


    public static async fetchNeuronCategory() {
        const response = await fetch(`${ApiCaller.baseUrl}/neuron/category`);
        const data = await response.json();
        //console.log(data.data);
        return data.data;
    }

    public static async fetchExamList() {
        const response = await fetch(`${ApiCaller.baseUrl}/neuron/exam`);
        const data = await response.json();
        //console.log(data.data);
        return data.data;
    }

    public static async fetchSubjectList() {
        const response = await fetch(`${ApiCaller.baseUrl}/neuron/subject`);
        const data = await response.json();
        //console.log(data.data);
        return data.data;
    }

    public static async fetchTopicList() {
        const response = await fetch(`${ApiCaller.baseUrl}/neuron/topic`);
        const data = await response.json();
        //console.log(data.data);
        return data.data;
    }
}