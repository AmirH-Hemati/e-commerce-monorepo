import qs from "qs";
import { Request } from "express";
import { Document, Model, Query } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      queryFilter?: object;
    }
  }
}

class ApiFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: any;
  constructor(
    public Model: Model<T>,
    public req: Request
  ) {
    this.query = this.Model.find();
    this.queryString = req.queryFilter || req.query;
  }

  Filter() {
    const queryObj = { ...qs.parse(this.queryString) };
    const excludedField = ["page", "sort", "fields", "limit"];

    excludedField.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default ApiFeatures;
