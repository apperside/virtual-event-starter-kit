/* eslint-disable @typescript-eslint/no-unsafe-return */
// Inspired by https://github.com/tonivj5/typeorm-naming-strategies
import { DefaultNamingStrategy } from "typeorm"
import { snakeCase, camelCase } from "typeorm/util/StringUtils"

export class SnakeCaseNamingStrategy extends DefaultNamingStrategy {
	// Pluralise table names (set customName to override)
	tableName(className: any, customName: any) {
		return customName || snakeCase(`${className}s`)
	}

	columnName(propertyName: string, customName: any, embeddedPrefixes: any[]) {
		return `${snakeCase(embeddedPrefixes.join("_"))}${customName || snakeCase(propertyName)
			}`
	}

	relationName(propertyName: string) {
		return snakeCase(propertyName)
	}

	joinColumnName(relationName: any, referencedColumnName: any) {
		return snakeCase(`${relationName}_${referencedColumnName}`)
	}

	joinTableName(
		firstTableName: any,
		secondTableName: any,
		firstPropertyName: string,
		secondPropertyName: any
	) {
		return snakeCase(
			`${firstTableName}_${firstPropertyName.replace(
				/\./gi,
				"_"
			)}_${secondTableName}`
		)
	}

	joinTableColumnName(tableName: any, propertyName: any, columnName: any) {
		return snakeCase(`${tableName}_${columnName || propertyName}`)
	}

	classTableInheritanceParentColumnName(
		parentTableName: any,
		parentTableIdPropertyName: any
	) {
		return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`)
	}

	eagerJoinRelationAlias(alias: any, propertyPath: string) {
		return `${alias}__${propertyPath.replace(".", "_")}`
	}
}

export class CamelCaseNamingStrategy extends DefaultNamingStrategy {
	// Pluralise collection names, uses (set customName to override)
	tableName(className: any, customName: any) {
		return customName || camelCase(`${className}s`)
	}
}
