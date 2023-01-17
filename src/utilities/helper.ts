export function mapTwoWay<T>(getter: string, mutation: string) {
  return {
    get(this: Vue): T {
      return this.$store.getters[getter];
    },
    set(this: Vue, value: T) {
      this.$store.commit(mutation, value);
    },
  };
}

export const delay = (ms: number): Promise<any> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
