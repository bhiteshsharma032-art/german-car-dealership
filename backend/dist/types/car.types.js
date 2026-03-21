"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = exports.BodyType = exports.TransmissionType = exports.FuelType = void 0;
var FuelType;
(function (FuelType) {
    FuelType["BENZIN"] = "Benzin";
    FuelType["DIESEL"] = "Diesel";
    FuelType["ELEKTRO"] = "Elektro";
    FuelType["HYBRID"] = "Hybrid";
    FuelType["PLUG_IN_HYBRID"] = "Plug-in-Hybrid";
})(FuelType || (exports.FuelType = FuelType = {}));
var TransmissionType;
(function (TransmissionType) {
    TransmissionType["AUTOMATIK"] = "Automatik";
    TransmissionType["SCHALTGETRIEBE"] = "Schaltgetriebe";
})(TransmissionType || (exports.TransmissionType = TransmissionType = {}));
var BodyType;
(function (BodyType) {
    BodyType["LIMOUSINE"] = "Limousine";
    BodyType["SUV"] = "SUV";
    BodyType["KOMBI"] = "Kombi";
    BodyType["COUPE"] = "Coup\u00E9";
    BodyType["CABRIO"] = "Cabrio";
    BodyType["VAN"] = "Van";
    BodyType["SPORTWAGEN"] = "Sportwagen";
})(BodyType || (exports.BodyType = BodyType = {}));
var Condition;
(function (Condition) {
    Condition["NEU"] = "Neu";
    Condition["GEBRAUCHT"] = "Gebraucht";
    Condition["JAHRESWAGEN"] = "Jahreswagen";
})(Condition || (exports.Condition = Condition = {}));
