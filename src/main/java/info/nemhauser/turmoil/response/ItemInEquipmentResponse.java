package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.enums.ItemSlot;

public class ItemInEquipmentResponse
{
	private String ident;
	private String fileCode;
	private String filePath;
	private String rarity;
	private String type;

	private String slot;

	/*
	 * TODO: extends ItemInEquipmentResponse
	 */

	public ItemInEquipmentResponse(Item item, ItemSlot slot)
	{
		this.ident = item.getIdent();
		this.fileCode = item.getFileCode();
		this.filePath = item.getFullImagePath();
		this.rarity = item.getRarityClass();
		this.type = item.itemType.toString();
		this.slot = slot.getClassName();
	}

	public String getIdent()
	{
		return ident;
	}

	public String getFileCode()
	{
		return fileCode;
	}

	public String getFilePath()
	{
		return filePath;
	}

	public String getRarity()
	{
		return rarity;
	}

	public String getType()
	{
		return type;
	}

	public String getSlot()
	{
		return slot;
	}
}
