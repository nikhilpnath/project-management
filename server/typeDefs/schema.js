import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull, //means its required
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

//mongoose models
import Project from "../models/Project.js";
import Client from "../models/Client.js";

//Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "Represents the Projects",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    client: {
      //relation
      type: ClientType,
      resolve: (parent) => Client.findById(parent.clientId),
    },
  }),
});

//client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "Represents the client",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    projects: {
      //relation
      type: new GraphQLList(ProjectType),
      resolve: (parent) => Project.find({ clientId: parent.id }),
    },
  }),
});

//query

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    clients: {
      type: new GraphQLList(ClientType), // means, a list of clientTypes(array of obects)
      description: "All clients",
      resolve: () => Client.find(),
    },
    client: {
      type: ClientType,
      description: "single client",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => Client.findById(args.id),
    },

    projects: {
      type: new GraphQLList(ProjectType),
      description: "All Projects",
      resolve: () => Project.find(),
    },
    project: {
      type: ProjectType,
      description: "single project",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => Project.findById(args.id),
    },
  },
});

//inputs for mutations
const AddClientInput = new GraphQLInputObjectType({
  name: "AddClientInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UpdateClientInput = new GraphQLInputObjectType({
  name: "UpdateClientInput",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const AddProjectInput = new GraphQLInputObjectType({
  name: "AddProjectInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLEnumType({
        name: "ProjectStatus",
        values: {
          new: { value: "Not Started" },
          progress: { value: "In Progress" },
          completed: { value: "Completed" },
        },
      }),
      defaultValue: "Not Started",
    },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

const UpdateProjectInput = new GraphQLInputObjectType({
  name: "UpdateProjectInput",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: new GraphQLEnumType({
        name: "ProjectStatusUpdate",
        values: {
          new: { value: "Not Started" },
          progress: { value: "In Progress" },
          completed: { value: "Completed" },
        },
      }),
    },
  }),
});

//mutations (update,add, delete)
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addClient: {
      type: ClientType,
      args: { client: { type: new GraphQLNonNull(AddClientInput) } },
      resolve: (_, args) => {
        const newClient = new Client({
          name: args.client.name,
          email: args.client.email,
          phone: args.client.phone,
        });

        return newClient.save();
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        edits: { type: new GraphQLNonNull(UpdateClientInput) },
      },
      resolve: async (_, args) => {
        const updatedProject = await Client.findByIdAndUpdate(
          args.id,
          { $set: args.edits },
          { new: true }
        );
        return updatedProject;
      },
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => {
        return Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: { project: { type: new GraphQLNonNull(AddProjectInput) } },
      resolve: (_, args) => {
        const newProject = new Project({
          name: args.project.name,
          description: args.project.description,
          status: args.project.status,
          clientId: args.project.clientId,
        });

        return newProject.save();
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        edits: { type: new GraphQLNonNull(UpdateProjectInput) },
      },
      resolve: async (_, args) => {
        const updatedProject = await Project.findByIdAndUpdate(
          args.id,
          { $set: args.edits },
          { new: true }
        );
        return updatedProject;
      },
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => {
        return Project.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutations });

export default schema;
