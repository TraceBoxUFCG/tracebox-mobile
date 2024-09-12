import type { Asset } from "./asset";
import type { ReceivementItem } from "./receivementItem";

export type AssetLot = {
    id: number;
    receivement_item_id: number;
    asset_id: number | null;
    receivement_item: ReceivementItem;
    asset: Asset | null;
}