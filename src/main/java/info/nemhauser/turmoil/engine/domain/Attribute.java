package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.AttributeType;

public class Attribute
{
	Item item;

	public AttributeType type;

	public double primaryValue = 0;
	public double secondaryValue = 0;
	double tertiaryValue = 0;

	public Attribute(Item item, AttributeType attributeType, double primaryValue, double secondaryValue, double tertiaryValue)
	{
		this.item = item;
		this.type = attributeType;
		this.primaryValue = primaryValue;
		this.secondaryValue = secondaryValue;
		this.tertiaryValue = tertiaryValue;
	}

	public String toString() {
		return "${type} [${primaryValue}, ${secondaryValue}, ${tertiaryValue}]";
	}

	public String toStringFull()
	{
		return	"[ " 				+
				"type: "			+ type				+ ", " +
				"primaryValue: "	+ primaryValue		+ ", " +
				"secondaryValue: "	+ secondaryValue	+ ", " +
				"tertiaryValue: "	+ tertiaryValue		+
				" ]";
	}

	public void getValues()
	{
		//return [primaryValue, secondaryValue, tertiaryValue];
	}
}
