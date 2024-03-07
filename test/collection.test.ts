import { Collection, iCollection } from "../src/collection.js";

export type Actor = {
  id: number;
  name: string;
};

describe("Given Actors imported", () => {
  it("then Actors should be defined", () => {
    expect(Collection).toBeDefined();
  });
  describe("When a new actors collection instantiated with an array of actors", () => {
    let actors: iCollection<Actor>;
    beforeEach(() => {
      actors = Collection.create<Actor>([
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ]);
    });
    it("then actors is an array", () => {
      expect(Array.isArray(actors)).toBe(true);
    });
    it("then actors contains same as the original array", () => {
      expect(actors).toEqual([
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ]);
    });
    it("then actors should have an id property", () => {
      expect(actors.id).toBeDefined();
    });
    it("then actors should have an add method", () => {
      expect(actors.add).toBeDefined();
    });
    describe("When .push(actor)", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actors.push({ id: 3, name: "Actor 3" });
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is added to the actors array", () => {
        expect(actors).toEqual([
          { id: 1, name: "Actor 1" },
          { id: 2, name: "Actor 2" },
          { id: 3, name: "Actor 3" },
        ]);
      });
      it("then the length of actors should be updated", () => {
        expect(actors.length).toBe(3);
      });
      it("then 'onadd' event should be dispatched", () => {
        expect(onadd).toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
      it("then 'onremove' event should not be dispatched", () => {
        expect(onremove).not.toHaveBeenCalled();
      });
    });
    describe("When .pop()", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actors.pop();
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is removed from the actors array", () => {
        expect(actors).toEqual([{ id: 1, name: "Actor 1" }]);
      });
      it("then the length of actors should be updated", () => {
        expect(actors.length).toBe(1);
      });
      it("then 'onremove' event should be dispatched", () => {
        expect(onremove).toHaveBeenCalled();
      });
      it("then 'onadd' event should not be dispatched", () => {
        expect(onadd).not.toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
    });
    describe("When .add(actor)", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;

      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actors.add({ id: 3, name: "Actor 3" });
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is added to the actors array", () => {
        expect(actors).toEqual([
          { id: 1, name: "Actor 1" },
          { id: 2, name: "Actor 2" },
          { id: 3, name: "Actor 3" },
        ]);
      });
      it("then the length of actors should be updated", () => {
        expect(actors.length).toBe(3);
      });
      it("then 'onadd' event should be dispatched", () => {
        expect(onadd).toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
      it("then 'onremove' event should not be dispatched", () => {
        expect(onremove).not.toHaveBeenCalled();
      });
    });
    describe("When .remove(actor)", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actors.remove(actors[0]);
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is removed from the actors array", () => {
        expect(actors).toEqual([{ id: 2, name: "Actor 2" }]);
      });
      it("then the length of actors should be updated", () => {
        expect(actors.length).toBe(1);
      });
      it("then 'onremove' event should be dispatched", () => {
        expect(onremove).toHaveBeenCalled();
      });
      it("then 'onadd' event should not be dispatched", () => {
        expect(onadd).not.toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
    });
    describe("When .add(actor).add(actor)", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actors.add({ id: 3, name: "Actor 3" }).add({ id: 4, name: "Actor 4" });
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is added to the actors array", () => {
        expect(actors).toEqual([
          { id: 1, name: "Actor 1" },
          { id: 2, name: "Actor 2" },
          { id: 3, name: "Actor 3" },
          { id: 4, name: "Actor 4" },
        ]);
      });
      it("then the length of actors should be updated", () => {
        expect(actors.length).toBe(4);
      });
      it("then 'onadd' event should be dispatched", () => {
        expect(onadd).toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
      it("then 'onremove' event should not be dispatched", () => {
        expect(onremove).not.toHaveBeenCalled();
      });
    });
    describe("When actor = actors[0]", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;

      let actor: Actor;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actor = actors[0];
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is the first actor in the actors array", () => {
        expect(actor).toEqual({ id: 1, name: "Actor 1" });
      });
      it("then 'onadd' event should not be dispatched", () => {
        expect(onadd).not.toHaveBeenCalled();
      });
      it("then 'onupdate' event should not be dispatched", () => {
        expect(onupdate).not.toHaveBeenCalled();
      });
      it("then 'onremove' event should not be dispatched", () => {
        expect(onremove).not.toHaveBeenCalled();
      });
    });
    describe("When actors[0] = actor", () => {
      let onadd: jasmine.Spy;
      let onupdate: jasmine.Spy;
      let onremove: jasmine.Spy;

      let actor: Actor;
      beforeEach(() => {
        onadd = jasmine.createSpy("onadd");
        onupdate = jasmine.createSpy("onupdate");
        onremove = jasmine.createSpy("onremove");

        actors.addEventListener("onadd", onadd);
        actors.addEventListener("onupdate", onupdate);
        actors.addEventListener("onremove", onremove);

        actor = { id: 5, name: "Actor 5" };
        actors[0] = actor;
      });
      afterEach(() => {
        actors.removeEventListener("onadd", onadd);
        actors.removeEventListener("onremove", onremove);
        actors.removeEventListener("onupdate", onupdate);
      });
      it("then actor is the first actor in the actors array", () => {
        expect(actor).toEqual({ id: 5, name: "Actor 5" });
      });
      it("then 'onadd' event should not be dispatched", () => {
        expect(onadd).not.toHaveBeenCalled();
      });
      it("then 'onupdate' event should be dispatched", () => {
        expect(onupdate).toHaveBeenCalled();
      });
      it("then 'onremove' event should not be dispatched", () => {
        expect(onremove).not.toHaveBeenCalled();
      });
    });
  });
});
