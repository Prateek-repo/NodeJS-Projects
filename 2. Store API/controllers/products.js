const product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, limit, page, numericFilters } =
    req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = {
      $regex: `${name}`,
      $options: "i",
    };
  }
  if (numericFilters) {
    const operatorMaps = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMaps[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value),
        };
      }
    });
  }
  // sorting starts at 4 hr 15 min in course
  //sort
  let result = product.find(queryObject);
  if (sort) {
    const sortString = sort.split(",").join(" ");
    result.sort(sortString);
  } else {
    result.sort("createdAt");
  }
  // select only specific fields
  if (fields) {
    const fieldsString = fields.split(",").join(" ");
    result.select(fieldsString);
  }
  const pageCount = Number(page) || 1; // page number
  const limitCount = Number(limit) || 10; // no of object to show in one api call
  const skip = (page - 1) * limit; // skip the data as per the page and limit
  result.limit(limitCount).skip(skip);

  // all these queries are in mongoose query page in mongoose doc

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const search = "bar";
  const products = await product.find({
    name: { $regex: search, $options: "i" },
  }); // searching for name but which has a substring or whole string as 'a' and option i is case insensitive
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
